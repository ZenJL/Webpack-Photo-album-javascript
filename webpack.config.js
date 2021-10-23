const path = require('path');
// const { Module } = require('webpack');

module.exports = {
    mode: 'development',
    entry: './main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),  //creat folder
        filename: 'index.js',   // put file name
    },
}