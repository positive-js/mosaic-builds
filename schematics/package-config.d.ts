import { Tree } from '@angular-devkit/schematics';
export declare function getPackageVersionFromPackageJson(tree: Tree, name: string): string | null;
export declare function addPackageToPackageJson(host: Tree, pkg: string, version: string): Tree;
