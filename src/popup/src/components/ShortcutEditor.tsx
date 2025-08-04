import React, { useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Edit3, Save, X } from "lucide-react";

import type { Shortcut } from "@/lib/shortcut";
import { defaultShortcut, shortcutToString, getHumanKey } from "@/lib/shortcut";

type Props = {
  lang: "en" | "fa";
  onChange?: (s: Shortcut) => void;
  shortcut: Shortcut | null;
  setShortcut: Dispatch<SetStateAction<Shortcut | null>>;
};

const labels = {
  en: {
    edit: "Edit Shortcut",
    save: "Save",
    cancel: "Cancel",
    press: "Press shortcut keys...",
    invalid: "Invalid shortcut",
    saved: "Saved!",
    current: "Current Shortcut",
  },
  fa: {
    edit: "ویرایش میانبر",
    save: "ذخیره",
    cancel: "لغو",
    press: "کلیدهای میانبر را وارد کنید...",
    invalid: "میانبر معتبر نیست",
    saved: "ذخیره شد!",
    current: "میانبر فعلی",
  },
};

export function ShortcutEditor({ lang, onChange,shortcut,setShortcut }: Props) {
  const [editing, setEditing] = useState(false);
  const [pressed, setPressed] = useState<Shortcut | null>(null);
  const [msg, setMsg] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    chrome.storage.sync.get(["shortcut"], (res: { shortcut?: Shortcut }) => {
      setShortcut(res.shortcut ?? defaultShortcut);
    });
  }, []);

  useEffect(() => {
    if (editing && inputRef.current) inputRef.current.focus();
  }, [editing]);

  const t = labels[lang];

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!editing) return;
    e.preventDefault();

    if (["Control", "Meta", "Alt", "Shift"].includes(e.key)) {
      setPressed(null);
      setMsg(t.press);
      return;
    }

    const isMac = /mac/i.test(window.navigator.userAgent);
    const effectiveCtrl = isMac && e.metaKey ? false : e.ctrlKey;

    const s: Shortcut = {
      ctrl: effectiveCtrl,
      alt: e.altKey,
      shift: e.shiftKey,
      meta: e.metaKey,
      code: e.code,
      keyView: getHumanKey(e.nativeEvent),
    };
    setPressed(s);

    setMsg("");
  }

  function startEdit() {
    setPressed(null);
    setEditing(true);
    setMsg(t.press);
  }

  function save() {
    if (!pressed || !pressed.code) {
      setMsg(t.invalid);
      return;
    }
    chrome.storage.sync.set({ shortcut: pressed }, () => {
      setShortcut(pressed);
      setEditing(false);
      setMsg(t.saved);
      setTimeout(() => setMsg(""), 1000);
      onChange?.(pressed);
    });
  }

  function cancel() {
    setEditing(false);
    setPressed(null);
    setMsg("");
  }

  const badges = shortcutToString(
    editing && pressed ? pressed : shortcut,
    lang
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium">{t.current}</span>
        {!editing && (
          <Button
            variant="ghost"
            size="sm"
            onClick={startEdit}
            className="h-7 px-2 text-xs text-cyan-600"
          >
            <Edit3 className="w-3 h-3 mr-1" />
            {t.edit}
          </Button>
        )}
      </div>

      {!editing && (
        <div className="flex gap-1 mb-2">
          {badges.map((key, i) => (
            <Badge
              key={i}
              variant="outline"
              className="text-sm px-3 py-1 bg-gradient-to-r from-cyan-50 to-blue-50 border-cyan-200 text-cyan-800"
            >
              {key}
            </Badge>
          ))}
        </div>
      )}

      {editing && (
        <div className="space-y-3">
          <Card
            className="p-3 bg-cyan-50 border-cyan-200 cursor-pointer"
            tabIndex={0}
            onClick={() => {
              inputRef.current?.focus();
            }}
            onKeyDown={() => {
              inputRef.current?.focus();
            }}
            role="button"
            aria-label={t.press}
          >
            <input
              ref={inputRef}
              className="sr-only"
              value=""
              tabIndex={-1}
              onKeyDown={onKeyDown}
              readOnly
              autoFocus
            />
            <div className="mb-2 text-xs text-cyan-700">{msg || t.press}</div>
            <div className="flex gap-1 flex-wrap min-h-[28px] items-center">
              {(pressed ? shortcutToString(pressed, lang) : []).map(
                (key, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="text-xs px-2 py-1 bg-cyan-100 text-cyan-800 border-cyan-300"
                  >
                    {key}
                  </Badge>
                )
              )}
              {!pressed && (
                <Badge
                  variant="secondary"
                  className="text-xs px-2 py-1 bg-gray-100 text-gray-500"
                >
                  ?
                </Badge>
              )}
            </div>
          </Card>
          <div className="flex gap-2">
            <Button
              size="sm"
              className="flex-1 h-8 text-xs bg-cyan-600 hover:bg-cyan-700"
              onClick={save}
              disabled={!pressed}
            >
              <Save className="w-3 h-3 mr-1" />
              {t.save}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 h-8 text-xs"
              onClick={cancel}
            >
              <X className="w-3 h-3 mr-1" />
              {t.cancel}
            </Button>
          </div>
        </div>
      )}

      {!!msg && !editing && (
        <div className="text-xs text-cyan-700 mt-2 min-h-[18px]">{msg}</div>
      )}
    </div>
  );
}
