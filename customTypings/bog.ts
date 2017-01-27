declare module 'bog' {     
    function debug(...args:any[]);  
    function info(...args:any[]); 
    function warn(...args:any[]);
    function error(...args:any[]);  
    function level(level:string);
}