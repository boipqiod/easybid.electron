declare module 'my-module' {
    // 글로벌 스코프에 대한 확장 선언
    interface Window {
        confirm(message?: string): boolean;
    }
}