export const Forgeme = {
  "version": "0.1.0",
  "name": "forgeme",
  "instructions": [
    {
      "name": "initializeStartup",
      "accounts": [
        { "name": "startup", "isMut": true, "isSigner": false },
        { "name": "founder", "isMut": true, "isSigner": true },
        { "name": "systemProgram", "isMut": false, "isSigner": false }
      ],
      "args": [
        { "name": "name", "type": "string" },
        { "name": "category", "type": "string" },
        { "name": "metadataUri", "type": "string" }
      ]
    },
    {
      "name": "registerContributor",
      "accounts": [
        { "name": "contributor", "isMut": true, "isSigner": false },
        { "name": "startup", "isMut": false, "isSigner": false },
        { "name": "founder", "isMut": true, "isSigner": true },
        { "name": "contributorWallet", "isMut": false, "isSigner": false },
        { "name": "systemProgram", "isMut": false, "isSigner": false }
      ],
      "args": [
        { "name": "contributorWallet", "type": "publicKey" }
      ]
    }
  ],
  "accounts": [
    {
      "name": "Startup",
      "type": {
        "kind": "struct",
        "fields": [
          { "name": "founder", "type": "publicKey" },
          { "name": "name", "type": "string" },
          { "name": "category", "type": "string" },
          { "name": "metadataUri", "type": "string" },
          { "name": "timestamp", "type": "i64" },
          { "name": "verified", "type": "bool" },
          { "name": "bump", "type": "u8" }
        ]
      }
    },
    {
      "name": "Contributor",
      "type": {
        "kind": "struct",
        "fields": [
          { "name": "wallet", "type": "publicKey" },
          { "name": "startup", "type": "publicKey" },
          { "name": "reputation", "type": "u64" },
          { "name": "contributions", "type": "u64" },
          { "name": "bump", "type": "u8" }
        ]
      }
    }
  ]
};
