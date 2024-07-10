"use client";

import { MDXEditor, MDXEditorMethods, headingsPlugin, UndoRedo, BoldItalicUnderlineToggles, toolbarPlugin, listsPlugin, linkPlugin, markdownShortcutPlugin, quotePlugin, BlockTypeSelect } from "@mdxeditor/editor";
import { FC } from "react";
import '@/app/components/Editor.css'; // Import your global styles

interface EditorProps {
  markdown: string;
  editorRef?: React.MutableRefObject<MDXEditorMethods | null>;
}

const Editor: FC<EditorProps> = ({ markdown, editorRef }) => {
  return (
    <MDXEditor
      onChange={(e) => console.log(e)}
    //   contentEditableClassName="prose-dark"
      ref={editorRef}
      markdown={markdown}
      plugins={[
        headingsPlugin(), 
        toolbarPlugin({
          toolbarContents: () => (
            <DiffSourceToggleWrapper>
                <div className="mdx-editor-toolbar">
                <UndoRedo className="mdx-editor-undo-redo" />
                <BoldItalicUnderlineToggles className="mdx-editor-bold-italic-underline" />
                <BlockTypeSelect className="mdx-editor-block-type-select" />
                {/* Add other plugins as needed */}
                </div>
            </DiffSourceToggleWrapper>
          )
        }),
        listsPlugin(), 
        linkPlugin(), 
        quotePlugin(), 
        markdownShortcutPlugin()
      ]}
    />
  );
};

export default Editor;
