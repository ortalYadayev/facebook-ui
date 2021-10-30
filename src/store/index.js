import { createStore } from 'vuex';

let modules = {}
const importedModules = import.meta.globEager('./*/index.js');

for (const path in importedModules) {
    const currModule = importedModules[path].default;

    Object.keys(currModule).map((key) => {
        modules[key] = {
            ...modules[key],
            ...currModule[key]
        }
    });
}

export default createStore(modules);