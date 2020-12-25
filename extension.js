const vscode = require('vscode');
const azdata = require('azdata');
const {getSqlScriptAsInsertAsync} = require('./scriptInsertAs.js');
const {getSqlScriptAsUpdateAsync} = require('./scriptUpdateAs.js');
const sqlUtils = require('./scriptSqlUtils.js');

function activate(context) 
{
    let insertTableCommandToClipBoard = vscode.commands.registerCommand("extraSqlScriptAs.insertTableToClipboard"
    , function(context) 
        {
            let databaseName = context.connectionProfile.databaseName;
            let schemaName = context.nodeInfo.metadata.schema;
            let tableName = context.nodeInfo.metadata.name;

            getSqlScriptAsInsertAsync(context.connectionProfile, databaseName, schemaName, tableName)
                .then(scriptText => 
                {
                    vscode.env.clipboard.writeText(scriptText).then((text)=>{
                        vscode.window.showInformationMessage('Script copied to clipboard.');
                    });
                })
                .catch(reason => 
                    {
                        vscode.window.showErrorMessage(reason);
                    }
                );     
        }
    );
   
    let insertTableCommand = vscode.commands.registerCommand("extraSqlScriptAs.insertTable"
        , function(context) 
        {
            let databaseName = context.connectionProfile.databaseName;
            let schemaName = context.nodeInfo.metadata.schema;
            let tableName = context.nodeInfo.metadata.name;

            getSqlScriptAsInsertAsync(context.connectionProfile, databaseName, schemaName, tableName)
                .then(scriptText => 
                {
                    vscode.commands.executeCommand('newQuery').then(s => {
                        
                        let editor = vscode.window.activeTextEditor;

                        editor.edit(edit => {
                            edit.insert(new vscode.Position(0, 0), scriptText);
                        });
                    });
                })
                .catch(reason => 
                    {
                        vscode.window.showErrorMessage(reason);
                    }
                );        
        }
    );

    let updateTableCommandToClipBoard = vscode.commands.registerCommand("extraSqlScriptAs.updateTableToClipboard"
    , function(context) 
        {
            let databaseName = context.connectionProfile.databaseName;
            let schemaName = context.nodeInfo.metadata.schema;
            let tableName = context.nodeInfo.metadata.name;

            getSqlScriptAsUpdateAsync(context.connectionProfile, databaseName, schemaName, tableName)
                .then(scriptText => 
                {
                    vscode.env.clipboard.writeText(scriptText).then((text)=>{
                        vscode.window.showInformationMessage('Script copied to clipboard.');
                    });
                })
                .catch(reason => 
                        {
                            vscode.window.showErrorMessage(reason);
                        }
                );      
        }
    );
   
    let updateTableCommand = vscode.commands.registerCommand("extraSqlScriptAs.updateTable"
        , function(context) 
        {
            let databaseName = context.connectionProfile.databaseName;
            let schemaName = context.nodeInfo.metadata.schema;
            let tableName = context.nodeInfo.metadata.name;

            getSqlScriptAsUpdateAsync(context.connectionProfile, databaseName, schemaName, tableName)
                .then(scriptText => 
                {
                    vscode.commands.executeCommand('newQuery').then(s => {
                        
                        let editor = vscode.window.activeTextEditor;

                        editor.edit(edit => {
                            edit.insert(new vscode.Position(0, 0), scriptText);
                        });
                    });
                })
                .catch(reason => 
                    {
                        vscode.window.showErrorMessage(reason);
                    }
            );      
        }
    );

    let deleteTableCommandToClipBoard = vscode.commands.registerCommand("extraSqlScriptAs.deleteTableToClipboard"
    , function(context) 
        {
            let databaseName = context.connectionProfile.databaseName;
            let schemaName = context.nodeInfo.metadata.schema;
            let tableName = context.nodeInfo.metadata.name;

            vscode.env.clipboard.writeText(sqlUtils.getDeleteSqlScript(databaseName, schemaName, tableName)).then((text)=>{
                vscode.window.showInformationMessage('Script copied to clipboard.');
            });     
        }
    );
   
    let deleteTableCommand = vscode.commands.registerCommand("extraSqlScriptAs.deleteTable"
        , function(context) 
        {
            let databaseName = context.connectionProfile.databaseName;
            let schemaName = context.nodeInfo.metadata.schema;
            let tableName = context.nodeInfo.metadata.name;

            vscode.commands.executeCommand('newQuery').then(s => {
                
                let editor = vscode.window.activeTextEditor;

                editor.edit(edit => {
                    edit.insert(new vscode.Position(0, 0)
                    , sqlUtils.getDeleteSqlScript(databaseName, schemaName, tableName))
                });
            });      
        }
    );

    context.subscriptions.push(insertTableCommand);
    context.subscriptions.push(insertTableCommandToClipBoard);

    context.subscriptions.push(updateTableCommand);
    context.subscriptions.push(updateTableCommandToClipBoard);

    context.subscriptions.push(deleteTableCommand);
    context.subscriptions.push(deleteTableCommandToClipBoard);
};

function deactivate() {

};

exports.activate = activate;
exports.deactivate = deactivate;