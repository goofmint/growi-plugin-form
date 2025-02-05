# GROIW Form Plugin

This is a GROWI script plugin for generating form on GROWI page.

## Usage

```markdown
:::form[contact]{}
{
    "display": "form",
    "settings": {
        "pdf": {
            "id": "1ec0f8ee-6685-5d98-a847-26f67b67d6f0",
            "src": "https://files.form.io/pdf/5692b91fd1028f01000407e3/file/1ec0f8ee-6685-5d98-a847-26f67b67d6f0"
        }
    },
    "components": [
        {
            "label": "Text Field",
            "applyMaskOn": "change",
            "tableView": true,
            "validateWhenHidden": false,
            "key": "textField",
            "type": "textfield",
            "input": true
        }
    ]
}
:::
```

You can use those parameters.

| Parameter | Description                                 |
| --------- | ------------------------------------------- |
| path      | Path for saving input data                  |
| role      | The role can see the input data             |
| message   | Showing this message when submited the form |

```markdown
::::form[contact]{path=/path/to/save role=admin message="Thank you for your submission."}
```

## License

MIT

