


declare type AvailablePlatforms = 'browser' | 'android' | 'ios';


declare type BuildOptions = {

    host: string;

    port: number;
    
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

    appearance?: string;

    template?: string;
    
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



declare type ProjectFrontendConfig = {

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
    assets?:{

        icon: BuildIconVariantes,

        splashScreen: BuildSplashscreen
        
    },


    /**
     * Fontend Path
     */
    path?: FrontendPaths,


    tools?:{

        [K : string] : string;
        
    }

    
}



declare type SensenProjectConfig = {

    path: {

        back: string;

        front: string;
        
    }
    
}


declare type ProjectConfig = {

    [K: string] : any;

    name?: string;

    version?: string;

    main?: string;

    author?: string;

    license?: string;

    sensen : SensenProjectConfig
    
}