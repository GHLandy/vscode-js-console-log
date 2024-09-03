// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { insertLineText } from './insert-line-text';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const disposable = vscode.commands.registerCommand('extension.console-log', () => {
    const editor = vscode.window.activeTextEditor;

    if (!editor) {
      return;
    }

    const { getText, getWordRangeAtPosition } = editor.document;
    const selection = editor.selection;
    const wordRangeAtPosition = getWordRangeAtPosition(selection.active);
    let text = getText(selection).trim();
    if (!text && wordRangeAtPosition) {
      text = getText(wordRangeAtPosition).trim();
    }

    vscode.commands.executeCommand('editor.action.insertLineAfter').then(() => {
      const string = `console.log('%c ${[text].join()} ', 'font-size: 14px; background: #00f3f3', ${[text].join()});`;

      insertLineText(string);
    });
  });

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
