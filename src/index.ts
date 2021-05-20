const { Client, LogLevel } = require('@notionhq/client');

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
  logLevel: (process.env.DEBUG && LogLevel.DEBUG) || LogLevel.WARN,
});

const DATABASE_ID: string | undefined = process.env.DATABASE_ID;
const PAGE_ID: string | undefined = process.env.PAGE_ID;
const CREATE_PAGE: string | undefined = process.env.CREATE_PAGE;
const USER_ID: string | undefined = process.env.USER_ID;

(async () => {

    try {
        // Search
        const search = await notion.search({
            query: 'Apple',
            // Only last_edited_time field is supported
            sort: {
                direction: 'ascending',
                timestamp: 'last_edited_time',
            },
            // Only object field with page/database values are supported
            filter: {
                property: 'object',
                value: 'page',
            },
            page_size: 1
        });

        console.log('Search')
        console.log(search);

        if (search.has_more) {
            const sndSearch = await notion.search({
                query: 'Apple',
                sort: {
                    direction: 'ascending',
                    timestamp: 'last_edited_time',
                },
                filter: {
                    property: 'object',
                    value: 'page',
                },
                // Provide previous cursor to restart correctly the search
                start_cursor: search.next_cursor
            })

            console.log('Second search')
            console.log(sndSearch);
        }

        // List users
        const listUsersResponse = await notion.users.list();

        console.log('Users');
        console.log(listUsersResponse);

        if (USER_ID) {
            const user = await notion.users.retrieve({
                user_id: USER_ID
            });

            console.log('User retrieve');
            console.log(user);
        }

        if (DATABASE_ID) {
            // Get database
            const db = await notion.databases.retrieve({
                database_id: DATABASE_ID,
            });

            console.log('Database retrieve');
            console.log(db);

            // Query a notion database with filter
            const dbQuery = await notion.databases.query({
                database_id: DATABASE_ID,
                filter: {
                    property: 'Town',
                    text: {
                        contains: 'Paris',
                    },
                },
            });

            console.log('Database query');
            console.log(dbQuery);
        }

        // Query a notion database
        const dbList = await notion.databases.list();

        console.log('Databases list');
        console.log(dbList);

        if (PAGE_ID) {
            // Get page
            const page = await notion.pages.retrieve({
                page_id: PAGE_ID,
            });

            console.log('Page retrieve');
            console.log(page);
        }

        if (CREATE_PAGE && PAGE_ID) {
            // Create page
            const newPage = await notion.pages.create({
                parent: {
                    page_id: PAGE_ID
                },
                properties: {
                    title: [{
                        type: "text",
                        text: {
                            content: "Apple"
                        }
                    }],
                }
            });

            console.log('Page created');
            console.log(newPage);

            // Add page content
            const add = await notion.blocks.children.append({
                block_id: PAGE_ID,
                children: [{
                    object: "block",
                    type: "paragraph",
                    paragraph: {
                        text: [{
                            type: "text",
                            text: {
                                content: "An apple is red, green or yellow"
                            }
                        }]
                    }
                }]
            });

            console.log('Block added');
            console.log(add);

            // Get page content
            const listPageRes = await notion.blocks.children.list({
                block_id: PAGE_ID
            });

            console.log('List content');
            console.log(listPageRes);
        }
    } catch (err) {
        console.log(err);
    }
  
})();