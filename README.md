# Jud Karn Hor
[ ] Create management group
[ ] User profile page

## DB

### user
- id: string
- name: string
- email: string
- photoUrl: string
- managementGrouop: [string]

### management group
- id: string
- name: string
- buildings: [ids]

### buildings
- id
- name


## How to debug firebase
- export GOOGLE_APPLICATION_CREDENTIALS=~/Dev/jud-karn-hor/backend/firebasekey/jud-karn-hor-bb8399840877.json 
- npm run build:watch
- firebase emulators:start --inspect-functions
- Hit debug