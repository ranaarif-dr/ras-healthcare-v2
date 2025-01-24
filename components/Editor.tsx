"use client";
  import { useEffect, useState } from "react";
  import { useEditor, EditorContent } from "@tiptap/react";
  import StarterKit from "@tiptap/starter-kit";
  import { Toggle } from "@/components/ui/toggle";
  import {
    Bold,
    Italic,
    List,
    ListOrdered,
    Heading1,
    Heading2,
    Heading3,
    Quote,
    Code,
    Undo,
    Redo,
    Link,
  } from "lucide-react";
  import CharacterCount from "@tiptap/extension-character-count";
  import Highlight from "@tiptap/extension-highlight";
  import TaskItem from "@tiptap/extension-task-item";
  import TaskList from "@tiptap/extension-task-list";

  import { createGlobalStyle } from "styled-components";
  import Link2 from "@tiptap/extension-link";

  import { Input } from "@/components/ui/input"
  import { Button } from "@/components/ui/button"
  import { X } from "lucide-react"

  const GlobalStyle = createGlobalStyle`
    .ProseMirror {
      outline: none;
    }
    .link-popup {
      position: absolute;
      background: white;
      border: 1px solid #ccc;
      border-radius: 4px;
      padding: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      z-index: 50;
    }
  `;

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function Editor({ value, onChange, className }: EditorProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [linkPopup, setLinkPopup] = useState({ show: false, x: 0, y: 0 });
  const [linkUrl, setLinkUrl] = useState("");
  const [linkError, setLinkError] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit.configure(),
      Highlight,
      TaskList,
      TaskItem,
      Link2.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
        HTMLAttributes: {
          class: "text-blue-500 underline",
        },
      }),
      CharacterCount.configure({
        limit: 10000,
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLinkButtonClick = () => {
    if (!editor) return;

    const { from, to } = editor.state.selection;
    if (from === to) {
      // No selection, ignore
      return;
    }

    const coords = editor.view.coordsAtPos(from);
    setLinkPopup({
      show: true,
      x: coords.left,
      y: coords.top - 40,
    });

    const currentLink = editor.getAttributes("link").href;
    setLinkUrl(currentLink || "");
  };

  const handleLinkSubmit = () => {
    try {
      if (linkUrl === "") {
        editor?.chain().focus().extendMarkRange("link").unsetLink().run();
      } else {
        const url = new URL(linkUrl.startsWith('http') ? linkUrl : `https://${linkUrl}`);
        editor?.chain().focus().extendMarkRange("link").setLink({ href: url.toString() }).run();
      }
      setLinkPopup({ show: false, x: 0, y: 0 });
      setLinkUrl("");
      setLinkError("");
    } catch (e) {
      setLinkError("Please enter a valid URL");
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <GlobalStyle />
      <div
        className={`border rounded-md ${className} flex flex-col h-full overflow-hidden relative`}
      >
        <div className="flex items-center border-b p-2 gap-1 flex-wrap">
          <Toggle
            size="sm"
            pressed={editor?.isActive("bold")}
            onPressedChange={() => editor?.chain().focus().toggleBold().run()}
          >
            <Bold className="h-4 w-4" />
          </Toggle>
          <Toggle
            size="sm"
            pressed={editor?.isActive("italic")}
            onPressedChange={() => editor?.chain().focus().toggleItalic().run()}
          >
            <Italic className="h-4 w-4" />
          </Toggle>
          <Toggle
            size="sm"
            pressed={editor?.isActive("bulletList")}
            onPressedChange={() =>
              editor?.chain().focus().toggleBulletList().run()
            }
          >
            <List className="h-4 w-4" />
          </Toggle>
          <Toggle
            size="sm"
            pressed={editor?.isActive("orderedList")}
            onPressedChange={() =>
              editor?.chain().focus().toggleOrderedList().run()
            }
          >
            <ListOrdered className="h-4 w-4" />
          </Toggle>
          <Toggle
            size="sm"
            pressed={editor?.isActive("heading", { level: 1 })}
            onPressedChange={() =>
              editor?.chain().focus().toggleHeading({ level: 1 }).run()
            }
          >
            <Heading1 className="h-4 w-4" />
          </Toggle>
          <Toggle
            size="sm"
            pressed={editor?.isActive("heading", { level: 2 })}
            onPressedChange={() =>
              editor?.chain().focus().toggleHeading({ level: 2 }).run()
            }
          >
            <Heading2 className="h-4 w-4" />
          </Toggle>
          <Toggle
            size="sm"
            pressed={editor?.isActive("heading", { level: 3 })}
            onPressedChange={() =>
              editor?.chain().focus().toggleHeading({ level: 3 }).run()
            }
          >
            <Heading3 className="h-4 w-4" />
          </Toggle>
          <Toggle
            size="sm"
            pressed={editor?.isActive("blockquote")}
            onPressedChange={() =>
              editor?.chain().focus().toggleBlockquote().run()
            }
          >
            <Quote className="h-4 w-4" />
          </Toggle>
          <Toggle
            size="sm"
            pressed={editor?.isActive("code")}
            onPressedChange={() => editor?.chain().focus().toggleCode().run()}
          >
            <Code className="h-4 w-4" />
          </Toggle>
          <Toggle
            size="sm"
            pressed={editor?.isActive("link")}
            onPressedChange={handleLinkButtonClick}
          >
            <Link className="h-4 w-4" />
          </Toggle>
          <Toggle
            size="sm"
            onPressedChange={() => editor?.chain().focus().undo().run()}
          >
            <Undo className="h-4 w-4" />
          </Toggle>
          <Toggle
            size="sm"
            onPressedChange={() => editor?.chain().focus().redo().run()}
          >
            <Redo className="h-4 w-4" />
          </Toggle>
        </div>
        {linkPopup.show && (
          <div
            className="link-popup fixed sm:absolute bg-background border rounded-lg shadow-lg p-4 min-w-[300px] max-w-[90vw]"
            style={{
              left: `${linkPopup.x}px`,
              top: `${linkPopup.y}px`,
            }}
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Insert Link</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={() => {
                    setLinkPopup({ show: false, x: 0, y: 0 });
                    setLinkUrl("");
                    setLinkError("");
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-col gap-2">
                <Input
                  type="text"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleLinkSubmit();
                    }
                    if (e.key === 'Escape') {
                      setLinkPopup({ show: false, x: 0, y: 0 });
                      setLinkUrl("");
                      setLinkError("");
                    }
                  }}
                  autoFocus
                />
                {linkError && (
                  <span className="text-destructive text-xs">{linkError}</span>
                )}
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setLinkPopup({ show: false, x: 0, y: 0 });
                    setLinkUrl("");
                    setLinkError("");
                  }}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleLinkSubmit}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        )}
        <EditorContent
          className="flex-grow overflow-auto p-4 prose max-w-none focus-within:outline-none"
          editor={editor}
        />
      </div>
    </>
  );
}
