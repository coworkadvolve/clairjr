import { defineConfig, type PluginOptions } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';

import { apiVersion, dataset, projectId } from './src/sanity/env';
import { schemaTypes } from './sanity/schemaTypes';
import { structure } from './sanity/structure';

const plugins: PluginOptions[] = [structureTool({ structure })];

if (process.env.NODE_ENV === 'development') {
  plugins.push(visionTool({ defaultApiVersion: apiVersion }));
}

export default defineConfig({
  name: 'default',
  title: 'Clair Lighting Solutions',
  projectId: projectId || 'missing-project-id',
  dataset,
  basePath: '/studio',
  plugins,
  schema: {
    types: schemaTypes,
  },
});
