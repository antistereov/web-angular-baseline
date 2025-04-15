export interface FileMetaData {
    key: string,
    owner: string,
    contentType: string,
    accessType: 'public' | 'shared' | 'private',
    sharedWith: SharedPermission[],
    publicUrl?: string,
    size: number,
    uploaded: Date,
}

export interface SharedPermission {
    userId: string,
    permissions: ('read' | 'write')[]
}
