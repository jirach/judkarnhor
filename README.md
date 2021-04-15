# Jud Karn Hor
[ ] Create management group
[ ] User profile page

## DB

### users
- id: string
- name: string
- email: string
- photoUrl: string
- managementGrouop: [string]

### management-groups
- id: string
- name: string

### buildings
- id
- name


## How to debug firebase
- export GOOGLE_APPLICATION_CREDENTIALS=~/Dev/jud-karn-hor/backend/firebasekey/jud-karn-hor-bb8399840877.json 
- npm run build:watch
- firebase emulators:start --inspect-functions
- Hit debug