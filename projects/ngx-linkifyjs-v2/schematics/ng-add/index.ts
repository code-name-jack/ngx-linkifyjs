import {
  Rule,
  SchematicContext,
  Tree,
  chain,
  noop,
} from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { addPackageJsonDependency, NodeDependencyType } from '../helpers';

/**
 * Schematic factory for ng-add
 * Installs @code-name-jack/ngx-linkifyjs package
 */
export function ngAdd(options: { skipInstall?: boolean } = {}): Rule {
  return chain([
    addPackageJsonDependencies(),
    options.skipInstall ? noop() : installPackageJsonDependencies(),
  ]);
}

/**
 * Adds package.json dependencies
 */
function addPackageJsonDependencies(): Rule {
  return (host: Tree, context: SchematicContext) => {
    const packageName = '@code-name-jack/ngx-linkifyjs';
    const packageVersion = loadPackageVersion(context);

    addPackageJsonDependency(host, {
      type: NodeDependencyType.Default,
      name: packageName,
      version: packageVersion,
    });

    context.logger.info(`✅ Added "${packageName}" to dependencies`);

    return host;
  };
}

/**
 * Installs package.json dependencies
 */
function installPackageJsonDependencies(): Rule {
  return (host: Tree, context: SchematicContext) => {
    context.addTask(new NodePackageInstallTask());
    context.logger.info('📦 Installing packages...');
    return host;
  };
}

/**
 * Loads package version from package.json
 */
function loadPackageVersion(context: SchematicContext): string {
  try {
    // Try to get version from package.json in the schematic package
    const packageJson = require('../../package.json');
    return `^${packageJson.version}` || 'latest';
  } catch {
    context.logger.warn('Could not determine package version, using "latest"');
    return 'latest';
  }
}
