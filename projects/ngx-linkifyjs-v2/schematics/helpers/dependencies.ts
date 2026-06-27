import { Tree } from '@angular-devkit/schematics';
import {
  addPackageJsonDependency as addDependency,
  NodeDependency,
  NodeDependencyType,
} from '@schematics/angular/utility/dependencies';

/**
 * Add a dependency to package.json
 */
export function addPackageJsonDependency(
  host: Tree,
  dependency: NodeDependency
): void {
  addDependency(host, dependency);
}

export { NodeDependency, NodeDependencyType };
