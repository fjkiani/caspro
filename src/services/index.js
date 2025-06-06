import { request, gql } from 'graphql-request';

// Use process.env for Next.js environment variables
const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

// Check if the environment variable is loaded
if (!graphqlAPI) {
  console.error("CRITICAL: NEXT_PUBLIC_GRAPHCMS_ENDPOINT is not defined. Check your .env.local file and ensure the Next.js development server was restarted after creating/modifying it.");
  // This will prevent the app from crashing if it's missing during build/runtime,
  // but the blog will not fetch data.
}

export const getPosts = async () => {
  if (!graphqlAPI) {
    console.warn("getPosts: graphqlAPI endpoint is not defined. Returning empty array.");
    return [];
  }
  const query = gql`
    query GetPostsQuery { # Renamed query for clarity
      postsConnection(orderBy: createdAt_DESC) {
        edges {
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;
  try {
    const result = await request(graphqlAPI, query);
    return result?.postsConnection?.edges || []; // Robustly return an array
  } catch (error) {
    console.error("Error fetching posts in getPosts service:", error);
    return []; // Return empty array on error
  }
};

export const getCategories = async () => {
  if (!graphqlAPI) return [];
  const query = gql`
    query GetCategories {
        categories {
          name
          slug
        }
    }
  `;
  try {
    const result = await request(graphqlAPI, query);
    return result?.categories || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export const getPostDetails = async (slug) => {
  if (!graphqlAPI) return null;
  const query = gql`
    query GetPostDetails($slug : String!) {
      post(where: {slug: $slug}) {
        title
        excerpt
        featuredImage {
          url
          width
          height
          mimeType
          fileName
        }
        author {
          name
          bio
          photo {
            url
          }
        }
        createdAt
        slug
        content {
          raw
        }
        categories {
          name
          slug
        }
      }
    }
  `;
  try {
    const result = await request(graphqlAPI, query, { slug });
    return result?.post || null;
  } catch (error) {
    console.error(`Error fetching post details for ${slug}:`, error);
    return null;
  }
};

export const getSimilarPosts = async (categories, slug) => {
  if (!graphqlAPI) return [];
  const query = gql`
    query GetSimilarPosts($slug: String!, $categories: [String!]) {
      posts(
        where: {slug_not: $slug, AND: {categories_some: {slug_in: $categories}}}
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;
  try {
    const result = await request(graphqlAPI, query, { slug, categories });
    return result?.posts || [];
  } catch (error) {
    console.error("Error fetching similar posts:", error);
    return [];
  }
};

export const getRecentPosts = async () => {
  if (!graphqlAPI) return [];
  const query = gql`
    query GetRecentBlogPosts { # Renamed for clarity
      posts(
        orderBy: createdAt_ASC
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }   
  `;
  try {
    const result = await request(graphqlAPI, query);
    return result?.posts || [];
  } catch (error) {
    console.error("Error fetching recent posts:", error);
    return [];
  }
};

export const getAdjacentPosts = async (createdAt, slug) => {
  if (!graphqlAPI) return { next: null, previous: null };
  const query = gql`
    query GetAdjacentPosts($createdAt: DateTime!,$slug:String!) {
      next:posts(
        first: 1
        orderBy: createdAt_ASC
        where: {slug_not: $slug, AND: {createdAt_gte: $createdAt}}
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
      previous:posts(
        first: 1
        orderBy: createdAt_DESC
        where: {slug_not: $slug, AND: {createdAt_lte: $createdAt}}
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;

  try {
    const result = await request(graphqlAPI, query, { slug, createdAt });
    return { next: result?.next?.[0] || null, previous: result?.previous?.[0] || null };
  } catch (error) {
    console.error("Error fetching adjacent posts:", error);
    return { next: null, previous: null };
  }
};

export const getCategoryPost = async (slug) => {
  if (!graphqlAPI) return [];
  const query = gql`
    query GetCategoryPost($slug: String!) {
      postsConnection(where: {categories_some: {slug: $slug}}) {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;
  try {
    const result = await request(graphqlAPI, query, { slug });
    return result?.postsConnection?.edges || [];
  } catch (error) {
    console.error(`Error fetching category post for ${slug}:`, error);
    return [];
  }
};

export const getFeaturedPosts = async () => {
  if (!graphqlAPI) return [];
  const query = gql`
    query GetFeaturedPosts { # Renamed for clarity
      posts(where: {featuredPost: true}) {
        author {
          name
          photo {
            url
          }
        }
        featuredImage {
          url
        }
        title
        slug
        createdAt
      }
    }   
  `;
  try {
    const result = await request(graphqlAPI, query);
    return result?.posts || [];
  } catch (error) {
    console.error("Error fetching featured posts:", error);
    return [];
  }
};

export const submitComment = async (obj) => {
  // This function doesn't use graphqlAPI directly, but for consistency with API calls:
  try {
    const result = await fetch('/api/comments', { // Assuming this is a Next.js API route
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    });
    return result.json();
  } catch (error) {
    console.error("Error submitting comment:", error);
    // Depending on expected return type, might throw error or return specific error object
    throw error; // Or return { error: true, message: error.message }
  }
};

export const getComments = async (slug) => {
  if (!graphqlAPI) return [];
  const query = gql`
    query GetComments($slug:String!) {
      comments(where: {post: {slug:$slug}}){
        name
        createdAt
        comment
      }
    }
  `;
  try {
    const result = await request(graphqlAPI, query, { slug });
    return result?.comments || [];
  } catch (error) {
    console.error(`Error fetching comments for ${slug}:`, error);
    return [];
  }
};

// ... (rest of the service functions like getPostDetails, getCategories, etc.) 
 