# Jud Karn Hor

[x] Add layouts
[x] Add material theme
[x] Firebase auth
    - npm install --save firebase
    - npm i @react-firebase/auth
[ ] dummy firebase with authen
[ ] call firebase from react with authen


## DB

### user
- id: string
- name: string
- email: string
- photoUrl: string

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