import _Vue from 'vue';
export function PermissionFiltersPlugin(Vue: typeof _Vue, options?: any): void {
    Vue.filter('hasPermission', (action: string, resource: string) => {
        return true;
    });
    Vue.filter('hasRole', (role: string) => {
        return true;
    });
}

// ????
