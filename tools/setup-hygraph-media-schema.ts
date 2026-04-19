/**
 * HyGraph Media Schema Setup Script
 * 
 * This script programmatically creates the Media schema in HyGraph:
 * - MediaType enum (PDF = manuscript /use-case/, DECK = blog decks, VIDEO)
 * - MediaCategory model
 * - MediaItem model
 * - Relations between models
 * 
 * Usage:
 *   npx tsx tools/setup-hygraph-media-schema.ts
 * 
 * Requires:
 *   HYGRAPH_MANAGEMENT_TOKEN in .env.local
 *   HYGRAPH_PROJECT_ID in .env.local (or pass as argument)
 */

import { GraphQLClient } from 'graphql-request';

// Management API endpoint
const MANAGEMENT_API = 'https://api.hygraph.com/v2';

// Get environment variables
// Try multiple sources for management token
const HYGRAPH_MANAGEMENT_TOKEN = 
  process.env.HYGRAPH_MANAGEMENT_TOKEN || 
  process.env.HYGRAPH_TOKEN ||
  process.env.NEXT_PUBLIC_HYGRAPH_TOKEN;

// Extract project ID from endpoint if available
const extractProjectId = (endpoint?: string): string | null => {
  if (!endpoint) return null;
  const match = endpoint.match(/cm[a-z0-9]+/);
  return match ? match[0] : null;
};

const HYGRAPH_PROJECT_ID = 
  process.env.HYGRAPH_PROJECT_ID || 
  extractProjectId(process.env.HYGRAPH_ENDPOINT) ||
  extractProjectId(process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT) ||
  process.argv[2];

if (!HYGRAPH_MANAGEMENT_TOKEN) {
  console.error('❌ Error: HYGRAPH_MANAGEMENT_TOKEN is required');
  console.error('   Add it to your .env.local file');
  process.exit(1);
}

if (!HYGRAPH_PROJECT_ID) {
  console.error('❌ Error: HYGRAPH_PROJECT_ID is required');
  console.error('   Add it to your .env.local file or pass as argument');
  console.error('   Usage: npx tsx tools/setup-hygraph-media-schema.ts <project-id>');
  process.exit(1);
}

const managementClient = new GraphQLClient(`${MANAGEMENT_API}/${HYGRAPH_PROJECT_ID}`, {
  headers: {
    Authorization: `Bearer ${HYGRAPH_MANAGEMENT_TOKEN}`,
  },
});

// GraphQL Mutations for Management API
const CREATE_ENUM = `
  mutation CreateEnum($name: String!, $values: [String!]!) {
    createEnum(data: { name: $name, values: $values }) {
      id
      name
    }
  }
`;

const CREATE_MODEL = `
  mutation CreateModel($name: String!) {
    createModel(data: { name: $name }) {
      id
      name
    }
  }
`;

const CREATE_FIELD = `
  mutation CreateField(
    $modelId: ID!
    $name: String!
    $type: FieldType!
    $required: Boolean
    $unique: Boolean
    $defaultValue: Json
    $list: Boolean
  ) {
    createField(
      data: {
        modelId: $modelId
        name: $name
        type: $type
        required: $required
        unique: $unique
        defaultValue: $defaultValue
        list: $list
      }
    ) {
      id
      name
    }
  }
`;

const CREATE_RELATION = `
  mutation CreateRelation(
    $modelId: ID!
    $name: String!
    $relatedModelId: ID!
    $reverseName: String
    $cardinality: RelationCardinality!
  ) {
    createRelation(
      data: {
        modelId: $modelId
        name: $name
        relatedModelId: $relatedModelId
        reverseName: $reverseName
        cardinality: $cardinality
      }
    ) {
      id
      name
    }
  }
`;

const GET_MODEL = `
  query GetModel($name: String!) {
    models(where: { name: $name }) {
      id
      name
    }
  }
`;

const GET_ENUM = `
  query GetEnum($name: String!) {
    enums(where: { name: $name }) {
      id
      name
    }
  }
`;

interface Model {
  id: string;
  name: string;
}

interface Enum {
  id: string;
  name: string;
}

/**
 * Check if a model exists
 */
async function modelExists(name: string): Promise<Model | null> {
  try {
    const result = await managementClient.request<{ models: Model[] }>(GET_MODEL, { name });
    return result.models[0] || null;
  } catch (error) {
    return null;
  }
}

/**
 * Check if an enum exists
 */
async function enumExists(name: string): Promise<Enum | null> {
  try {
    const result = await managementClient.request<{ enums: Enum[] }>(GET_ENUM, { name });
    return result.enums[0] || null;
  } catch (error) {
    return null;
  }
}

/**
 * Create enum if it doesn't exist
 */
async function createEnumIfNotExists(name: string, values: string[]): Promise<Enum> {
  const existing = await enumExists(name);
  if (existing) {
    console.log(`✅ Enum "${name}" already exists`);
    return existing;
  }

  try {
    const result = await managementClient.request<{ createEnum: Enum }>(CREATE_ENUM, {
      name,
      values,
    });
    console.log(`✅ Created enum "${name}" with values: ${values.join(', ')}`);
    return result.createEnum;
  } catch (error: any) {
    console.error(`❌ Failed to create enum "${name}":`, error.message);
    throw error;
  }
}

/**
 * Create model if it doesn't exist
 */
async function createModelIfNotExists(name: string): Promise<Model> {
  const existing = await modelExists(name);
  if (existing) {
    console.log(`✅ Model "${name}" already exists`);
    return existing;
  }

  try {
    const result = await managementClient.request<{ createModel: Model }>(CREATE_MODEL, {
      name,
    });
    console.log(`✅ Created model "${name}"`);
    return result.createModel;
  } catch (error: any) {
    console.error(`❌ Failed to create model "${name}":`, error.message);
    throw error;
  }
}

/**
 * Create a field on a model
 */
async function createField(
  modelId: string,
  name: string,
  type: string,
  options: {
    required?: boolean;
    unique?: boolean;
    defaultValue?: any;
    list?: boolean;
  } = {}
): Promise<void> {
  try {
    await managementClient.request(CREATE_FIELD, {
      modelId,
      name,
      type,
      required: options.required || false,
      unique: options.unique || false,
      defaultValue: options.defaultValue,
      list: options.list || false,
    });
    console.log(`  ✅ Created field "${name}" (${type})`);
  } catch (error: any) {
    // Field might already exist, check error
    if (error.message?.includes('already exists') || error.message?.includes('duplicate')) {
      console.log(`  ⚠️  Field "${name}" already exists, skipping`);
    } else {
      console.error(`  ❌ Failed to create field "${name}":`, error.message);
      throw error;
    }
  }
}

/**
 * Create a relation between models
 */
async function createRelation(
  modelId: string,
  name: string,
  relatedModelId: string,
  reverseName: string,
  cardinality: 'ONE' | 'MANY'
): Promise<void> {
  try {
    await managementClient.request(CREATE_RELATION, {
      modelId,
      name,
      relatedModelId,
      reverseName,
      cardinality,
    });
    console.log(`  ✅ Created relation "${name}" → "${reverseName}" (${cardinality})`);
  } catch (error: any) {
    if (error.message?.includes('already exists') || error.message?.includes('duplicate')) {
      console.log(`  ⚠️  Relation "${name}" already exists, skipping`);
    } else {
      console.error(`  ❌ Failed to create relation "${name}":`, error.message);
      throw error;
    }
  }
}

/**
 * Main setup function
 */
async function setupMediaSchema() {
  console.log('🚀 Setting up HyGraph Media Schema...\n');

  try {
    // Step 1: Create MediaType enum
    console.log('📋 Step 1: Creating MediaType enum...');
    const mediaTypeEnum = await createEnumIfNotExists('MediaType', ['PDF', 'VIDEO', 'DECK']);

    // Step 2: Create MediaCategory model
    console.log('\n📋 Step 2: Creating MediaCategory model...');
    const mediaCategoryModel = await createModelIfNotExists('MediaCategory');

    // Add fields to MediaCategory
    console.log('  Adding fields to MediaCategory...');
    await createField(mediaCategoryModel.id, 'title', 'String', { required: true });
    await createField(mediaCategoryModel.id, 'slug', 'String', { required: true, unique: true });
    await createField(mediaCategoryModel.id, 'description', 'RichText', { required: false });
    await createField(mediaCategoryModel.id, 'order', 'Int', { required: false });

    // Step 3: Create MediaItem model
    console.log('\n📋 Step 3: Creating MediaItem model...');
    const mediaItemModel = await createModelIfNotExists('MediaItem');

    // Add basic fields to MediaItem
    console.log('  Adding basic fields to MediaItem...');
    await createField(mediaItemModel.id, 'title', 'String', { required: true });
    await createField(mediaItemModel.id, 'slug', 'String', { required: true, unique: true });
    await createField(mediaItemModel.id, 'description', 'RichText', { required: false });
    await createField(mediaItemModel.id, 'excerpt', 'String', { required: false });
    await createField(mediaItemModel.id, 'type', 'Enum', { required: true }); // Will need to link to MediaType enum
    await createField(mediaItemModel.id, 'tags', 'String', { required: false, list: true });

    // Add PDF fields
    console.log('  Adding PDF fields...');
    await createField(mediaItemModel.id, 'pdfFile', 'Asset', { required: false });

    // Add video fields
    console.log('  Adding video fields...');
    await createField(mediaItemModel.id, 'videoUrl', 'String', { required: false });
    await createField(mediaItemModel.id, 'videoFile', 'Asset', { required: false });
    await createField(mediaItemModel.id, 'thumbnail', 'Asset', { required: false });

    // Add deck fields
    console.log('  Adding deck fields...');
    await createField(mediaItemModel.id, 'deckId', 'String', { required: false });
    await createField(mediaItemModel.id, 'deckSlug', 'String', { required: false });

    // Add common fields
    console.log('  Adding common fields...');
    await createField(mediaItemModel.id, 'featuredImage', 'Asset', { required: false });
    await createField(mediaItemModel.id, 'publishedAt', 'DateTime', { required: true });
    await createField(mediaItemModel.id, 'updatedAt', 'DateTime', { required: true });
    await createField(mediaItemModel.id, 'order', 'Int', { required: false });
    await createField(mediaItemModel.id, 'isPublished', 'Boolean', {
      required: true,
      defaultValue: false,
    });

    // Step 4: Create relations
    console.log('\n📋 Step 4: Creating relations...');
    await createRelation(
      mediaItemModel.id,
      'category',
      mediaCategoryModel.id,
      'mediaItems',
      'ONE'
    );

    console.log('\n✅ Media schema setup complete!');
    console.log('\n📝 Next steps:');
    console.log('   1. Go to your HyGraph project → Schema');
    console.log('   2. Verify the models and fields were created correctly');
    console.log('   3. Link the "type" field in MediaItem to the MediaType enum');
    console.log('   4. Set up API permissions for MediaItem and MediaCategory');
    console.log('   5. Start adding media items!');
  } catch (error: any) {
    console.error('\n❌ Setup failed:', error.message);
    console.error('\n💡 Note: The HyGraph Management API might have different field types.');
    console.error('   You may need to adjust field types in the script or complete setup manually.');
    process.exit(1);
  }
}

// Run the setup
setupMediaSchema().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
