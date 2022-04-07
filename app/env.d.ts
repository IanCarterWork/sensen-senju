


declare type AvailablePlatforms = 'web' | 'android' | 'ios';


declare type BuildOptions = {

    host: string;

    port: number;

    protocol: 'http' | 'https'
    
}



declare type PackageConfig = {

    id: string;

    name: string;

    version: string;

    versionNumber?: number;

    type?: string;
    
}




declare type PackagesInstalledProps = {

    id : string;

    name : string;

    version : string;

    versionNumber? : number;

    respository ?: string;

    type ?: string;

}



declare type ProjectBackendConfig = {

    name: string;

    version: string;

    versionNumber?: number;

    alias: {

        [P : string] : string
        
    }

    packages: {

        [P : string] : PackagesInstalledProps
        
    }
    
}




declare type BuildIconVariantes = {

    default: string;

    light?: string;

    dark?: string;

    black?: string;

    white?: string;
    
}



declare type BuildSplashscreen = {

    message?: string;

    color?: string;

    image?: string;

    spinner?: 'circle' | 'progressbar';
    
}



declare type FrontendPaths = {

    app: string;
    
        components?: string;
    
        activities?: string;
    
        theme?: string;
    
        themePalette?: string;
    
        themeTone?: string;
    
    pipe?: string;
    
        pipeComponents?: string,
    
        pipeActivities?: string,
    
        pipeTheme?: string,
    
        pipeThemePalette?: string,
    
        pipeThemeTone?: string,
    
    appearance?: string;

    buildTemplateFile?: string;
    
    build?: string;

    assets?: string;

    css?: string;

    js?: string;

    images?: string;

    fonts?: string;

    documents?: string;

    sounds?: string;

    videos?: string;

}



declare type BuildAssets = {

    icon: BuildIconVariantes,

    splashScreen: BuildSplashscreen
    
}



declare type BuildTools = {

    [K : string] : string;
    
}

declare type ProjectFrontendConfig = {

    /**
     * Frontend application title
     */
    title: string;

    /**
     * Frontend application name 
     */
    name: string;

    /**
     * Frontend application string's verion
     */
    version: string;

    /**
     * Frontend application number's version
     */
    versionNumber?: number;

    /**
     * Build mode
     */
    mode: 'production' | 'development';

    /**
     * Build target
     */
    target: AvailablePlatforms[];

    /**
     * Production's build
     */
    production: BuildOptions;

    /**
     * Development's build
     */
    development: BuildOptions;

    /**
     * Build Assets Icon & SplashScreen
     */
    assets?: BuildAssets,


    /**
     * Fontend Path
     */
    paths?: FrontendPaths,


    tools?: BuildTools

    
}



declare type ProjectConfig = {

    name?: string;

    version?: string;

    main?: string;

    author?: string;

    license?: string;

    path: {

        back: string;

        front: string;
        
    }
    
}


// declare type ProjectConfig = {

//     [K: string] : any;

//     name?: string;

//     version?: string;

//     main?: string;

//     author?: string;

//     license?: string;

//     sensen : SensenProjectConfig
    
// }



declare type ConfigCombos = {

    project: ProjectConfig;

    front?: ProjectFrontendConfig;

    back?: ProjectFrontendConfig;
    
}





declare type TTerminalTools = {

    output:{
        
        port:number

    },


    
}