# Jud Karn Hor
[ ] Building

## DB

### users
- id: string
- name: string
- email: string
- photoUrl: string
- managementGrouop: [{IManagementGroup}]

### management-groups
- id: string
- name: string

### buildings
- id
- managementGroup
- name
- (sub collection) rooms

### rooms
- id
- buildingId
- managementGroup
- floor
- roomNumber

## How to debug firebase
- export GOOGLE_APPLICATION_CREDENTIALS=~/Dev/jud-karn-hor/backend/firebasekey/jud-karn-hor-bb8399840877.json 
- npm run build:watch
- firebase emulators:start --inspect-functions
- Hit debug