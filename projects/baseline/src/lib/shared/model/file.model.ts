export interface FileMetaData {
    key: string,
    owner: string,
    contentType: string,
    accessType: 'public' | 'shared' | 'private',
    sharedWith: SharedPermission[],
    publicUrl?: string,
    size: number,
}

export interface SharedPermission {
    userId: string,
    permissions: ('read' | 'write')[]
}
