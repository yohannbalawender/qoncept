# Testing the Notion API beta

Just few examples of the Notion API beta, version 2021-05-13.

## How to build

Examples are already built from the sources `src` folder into the `build` folder.

However, if you'd like to change the sources and build the result, you can use the `npm run build` command.

## How to run

Simply execute the script `./build/index.js` with node and the following arguments:
* __NOTION_TOKEN__: the integration service secret token
* __DATABASE_ID__: a Notion database to target
* __PAGE_ID__: a Notion page to target
* __CREATE_PAGE__: if provide, will create pages and blocks when the script is run
* __USER_ID__: a Notion user to target

Full example:
`NOTION_TOKEN="a_secret" DATABASE_ID="112233445566778899aabbccddeeff" PAGE_ID="112233445566778899aabbccddeeff" CREATE_PAGE=1 USER_ID="11223344-5566-7788-99aa-bbccddeeff" node ./build/index.js`
