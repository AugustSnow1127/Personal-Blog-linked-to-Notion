import { Client } from "@notionhq/client";
import {
  PageObjectResponse,
  BlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const databaseId = process.env.NOTION_DATABASE_ID!;

// Types
export interface Post {
  id: string;
  title: string;
  slug: string;
  summary: string;
  date: string;
  tags: string[];
  published: boolean;
  cover?: string;
}

// Get all published posts
export async function getPosts(): Promise<Post[]> {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "Published",
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: "Date",
        direction: "descending",
      },
    ],
  });

  return response.results.map((page) => {
    const p = page as PageObjectResponse;
    const properties = p.properties;

    return {
      id: p.id,
      title: getTitle(properties.Title),
      slug: getRichText(properties.Slug),
      summary: getRichText(properties.Summary),
      date: getDate(properties.Date),
      tags: getMultiSelect(properties.Tags),
      published: getCheckbox(properties.Published),
      cover: getFileUrl(properties.Cover),
    };
  });
}

// Get a single post by slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        {
          property: "Slug",
          rich_text: {
            equals: slug,
          },
        },
        {
          property: "Published",
          checkbox: {
            equals: true,
          },
        },
      ],
    },
  });

  if (response.results.length === 0) {
    return null;
  }

  const page = response.results[0] as PageObjectResponse;
  const properties = page.properties;

  return {
    id: page.id,
    title: getTitle(properties.Title),
    slug: getRichText(properties.Slug),
    summary: getRichText(properties.Summary),
    date: getDate(properties.Date),
    tags: getMultiSelect(properties.Tags),
    published: getCheckbox(properties.Published),
    cover: getFileUrl(properties.Cover),
  };
}

// Get page content (blocks)
export async function getPageContent(pageId: string): Promise<BlockObjectResponse[]> {
  const blocks: BlockObjectResponse[] = [];
  let cursor: string | undefined;

  while (true) {
    const response = await notion.blocks.children.list({
      block_id: pageId,
      start_cursor: cursor,
    });

    blocks.push(...(response.results as BlockObjectResponse[]));

    if (!response.has_more) {
      break;
    }
    cursor = response.next_cursor ?? undefined;
  }

  return blocks;
}

// Helper functions to extract property values
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getTitle(prop: any): string {
  if (prop?.type === "title" && prop.title?.length > 0) {
    return prop.title[0].plain_text;
  }
  return "";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getRichText(prop: any): string {
  if (prop?.type === "rich_text" && prop.rich_text?.length > 0) {
    return prop.rich_text[0].plain_text;
  }
  return "";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getDate(prop: any): string {
  if (prop?.type === "date" && prop.date?.start) {
    return prop.date.start;
  }
  return "";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getMultiSelect(prop: any): string[] {
  if (prop?.type === "multi_select" && prop.multi_select) {
    return prop.multi_select.map((item: { name: string }) => item.name);
  }
  return [];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getCheckbox(prop: any): boolean {
  if (prop?.type === "checkbox") {
    return prop.checkbox;
  }
  return false;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getFileUrl(prop: any): string | undefined {
  if (prop?.type === "files" && prop.files && prop.files.length > 0) {
    const file = prop.files[0];
    if (file.type === "external") {
      return file.external.url;
    } else if (file.type === "file") {
      return file.file.url;
    }
  }
  return undefined;
}
