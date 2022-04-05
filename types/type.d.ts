



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