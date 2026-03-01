interface ServerStorage extends Instance {
  tools: Folder & {
    guns: Folder & {
      'CWD-21': Accessory;
    };

    misc: Folder;
    melees: Folder;
  };
}
