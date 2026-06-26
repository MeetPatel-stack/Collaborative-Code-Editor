import Editor from "@monaco-editor/react";

function EditorPanel({ activeDocument, loading, onCodeChange, saveStatus }) {
  if (loading) {
    return (
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Loading...
      </div>
    );
  }

  if (!activeDocument) {
    return (
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        No document selected
      </div>
    );
  }

  return (
    <div
      style={{
        flex: 1,
      }}
    >
      <div
        style={{
          padding: "10px",
          borderBottom: "1px solid #ccc",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span>{activeDocument.title}</span>

        <span>{saveStatus}</span>
      </div>

      <Editor
        height="95%"
        key={activeDocument._id}
        language={activeDocument.language}
        value={activeDocument.code}
        onChange={onCodeChange}
        theme="vs-dark"
        options={{
          minimap: {
            enabled: false,
          },
          lineNumbers: "on",
          wordWrap: "on",
          automaticLayout: true,
          autoClosingBrackets: "always",
          quickSuggestions: { other: true, comments: false, strings: false },
        }}
      />
    </div>
  );
}

export default EditorPanel;
