var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var _a = require('@notionhq/client'), Client = _a.Client, LogLevel = _a.LogLevel, APIErrorCode = _a.APIErrorCode;
// Initializing a client
var notion = new Client({
    auth: process.env.NOTION_TOKEN,
    logLevel: (process.env.DEBUG && LogLevel.DEBUG) || LogLevel.WARN,
});
var DATABASE_ID = process.env.DATABASE_ID;
var PAGE_ID = process.env.PAGE_ID;
var CREATE_PAGE = process.env.CREATE_PAGE;
var USER_ID = process.env.USER_ID;
(function () { return __awaiter(_this, void 0, void 0, function () {
    var search, sndSearch, listUsersResponse, user, db, dbQuery, dbList, page, newPage, add, listPageRes, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 17, , 18]);
                return [4 /*yield*/, notion.search({
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
                    })];
            case 1:
                search = _a.sent();
                console.log('Search');
                console.log(search);
                if (!search.has_more) return [3 /*break*/, 3];
                return [4 /*yield*/, notion.search({
                        start_cursor: search.next_cursor
                    })];
            case 2:
                sndSearch = _a.sent();
                console.log('Second search');
                console.log(sndSearch);
                _a.label = 3;
            case 3: return [4 /*yield*/, notion.users.list()];
            case 4:
                listUsersResponse = _a.sent();
                console.log('Users');
                console.log(listUsersResponse);
                if (!USER_ID) return [3 /*break*/, 6];
                return [4 /*yield*/, notion.users.retrieve({
                        user_id: USER_ID
                    })];
            case 5:
                user = _a.sent();
                console.log('User retrieve');
                console.log(user);
                _a.label = 6;
            case 6:
                if (!DATABASE_ID) return [3 /*break*/, 9];
                return [4 /*yield*/, notion.databases.retrieve({
                        database_id: DATABASE_ID,
                    })];
            case 7:
                db = _a.sent();
                console.log('Database retrieve');
                console.log(db);
                return [4 /*yield*/, notion.databases.query({
                        database_id: DATABASE_ID,
                        filter: {
                            property: 'Town',
                            text: {
                                contains: 'Paris',
                            },
                        },
                    })];
            case 8:
                dbQuery = _a.sent();
                console.log('Database query');
                console.log(dbQuery);
                _a.label = 9;
            case 9: return [4 /*yield*/, notion.databases.list()];
            case 10:
                dbList = _a.sent();
                console.log('Databases list');
                console.log(dbList);
                if (!PAGE_ID) return [3 /*break*/, 12];
                return [4 /*yield*/, notion.pages.retrieve({
                        page_id: PAGE_ID,
                    })];
            case 11:
                page = _a.sent();
                console.log('Page retrieve');
                console.log(page);
                _a.label = 12;
            case 12:
                if (!(CREATE_PAGE && PAGE_ID)) return [3 /*break*/, 16];
                return [4 /*yield*/, notion.pages.create({
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
                    })];
            case 13:
                newPage = _a.sent();
                console.log('Page created');
                console.log(newPage);
                return [4 /*yield*/, notion.blocks.children.append({
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
                    })];
            case 14:
                add = _a.sent();
                console.log('Block added');
                console.log(add);
                return [4 /*yield*/, notion.blocks.children.list({
                        block_id: PAGE_ID
                    })];
            case 15:
                listPageRes = _a.sent();
                console.log('List content');
                console.log(listPageRes);
                _a.label = 16;
            case 16: return [3 /*break*/, 18];
            case 17:
                err_1 = _a.sent();
                if (err_1.code == APIErrorCode.Unauthorized) {
                    console.error('Unauthorized error. Definitive.');
                }
                if (err_1.code == APIErrorCode.RestrictedResource) {
                    console.error('Restricted resource error. Definitive.');
                }
                if (err_1.code == APIErrorCode.ObjectNotFound) {
                    console.error('Object not found. Definitive. Check for the right identifier.');
                }
                if (err_1.code == APIErrorCode.RateLimited) {
                    console.error('Rate limit reach, try later. Temporary.');
                }
                if (err_1.code == APIErrorCode.InvalidJSON) {
                    console.error('Invalid JSON. Temporary.');
                }
                return [3 /*break*/, 18];
            case 18: return [2 /*return*/];
        }
    });
}); })();
