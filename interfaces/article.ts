interface ArticleMeta {
    title: string;
    description: string;
    thumbnail: string;
    creator: string;
    [key: string]: string;
}

interface ArticleInfo {
    slug?: string;
    meta: ArticleMeta;
    content: string;
}

export type {
    ArticleMeta,
    ArticleInfo
}