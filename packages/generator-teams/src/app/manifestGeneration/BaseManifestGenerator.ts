// Copyright (c) Wictor Wilén. All rights reserved. 
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { GeneratorTeamsAppOptions } from "../GeneratorTeamsAppOptions";
import { IManifestUpdater } from "./IManifestUpdater";

export abstract class BaseManifestGenerator {
    protected tabUpdater: IManifestUpdater;
    protected botUpdater: IManifestUpdater;
    protected messageExtensionUpdater: IManifestUpdater;
    protected connectorUpdater: IManifestUpdater;
    protected localizationUpdater: IManifestUpdater;

    public generateManifest(options: GeneratorTeamsAppOptions): any {
        const manifest: any = {
            "$schema": "https://developer.microsoft.com/en-us/json-schemas/teams/v1.8/MicrosoftTeams.schema.json",
            "manifestVersion": "1.8",
            "id": "{{APPLICATION_ID}}",
            "version": "{{VERSION}}",
            "packageName": "{{PACKAGE_NAME}}",
            "developer": {
                "name": options.developer,
                "websiteUrl": "https://{{PUBLIC_HOSTNAME}}",
                "privacyUrl": "https://{{PUBLIC_HOSTNAME}}/privacy.html",
                "termsOfUseUrl": "https://{{PUBLIC_HOSTNAME}}/tou.html"
            },
            "name": {
                "short": options.title,
                "full": options.title
            },
            "description": {
                "short": "TODO: add short description here",
                "full": "TODO: add full description here"
            },
            "icons": {
                "outline": "icon-outline.png",
                "color": "icon-color.png"
            },
            "accentColor": "#D85028",
            "configurableTabs": [],
            "staticTabs": [],
            "bots": [],
            "connectors": [],
            "composeExtensions": [],
            "permissions": ["identity", "messageTeamMembers"],
            "validDomains": [
                "{{PUBLIC_HOSTNAME}}"
            ]
        };

        if (options.mpnId && options.mpnId.length > 0) {
            manifest.developer.mpnId = options.mpnId;
        }
        manifest.showLoadingIndicator = options.showLoadingIndicator;
        manifest.isFullScreen = options.isFullScreen;
        return manifest;
    }

    public updateTabManifest(manifest: any, options: GeneratorTeamsAppOptions): void {
        this.tabUpdater.updateManifest(manifest, options);
    }
    public updateBotManifest(manifest: any, options: GeneratorTeamsAppOptions): void {
        this.botUpdater.updateManifest(manifest, options);
    }
    public updateMessageExtensionManifest(manifest: any, options: GeneratorTeamsAppOptions): void {
        this.messageExtensionUpdater.updateManifest(manifest, options);
    }
    public updateConnectorManifest(manifest: any, options: GeneratorTeamsAppOptions): void {
        this.connectorUpdater.updateManifest(manifest, options);
    }
    public updateLocalizationManifest(manifest: any, options: GeneratorTeamsAppOptions): void {
        if (this.localizationUpdater) {
            this.localizationUpdater.updateManifest(manifest, options);
        }
    }

    public abstract supportsUpdateManifest(from: string): boolean;

    public abstract updateManifest(manifest: any, log?: (message?: string, context?: any) => void): any;

}
