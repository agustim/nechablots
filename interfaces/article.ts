interface ArticleMeta {
    title: string;
    slug: string;
    description: string;
    thumbnail: string;
    creator: string;
}

interface ArticleInfo {
    meta: ArticleMeta;
    content: string;
}

export type {
    ArticleMeta,
    ArticleInfo
}