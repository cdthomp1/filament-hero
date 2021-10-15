# Models

## Filaments

```javascript
type: {
    type: String,
    required: true,
},
color: {
    type: String,
    required: true
},
length: {
    type: Number,
    required: true
},
diameter: {
    type: Number,
    default: 0
},
weight: {
    type: Number,
    default: 0
},
printingNozelTemp: {
    type: Number,
    default: 0
},
printingBedTemp: {
    type: Number,
    default: 0
},
maxOverHangDistance: {
    type: Number,
    default: 0
},
maxOverHangAngle: {
    type: Number,
    default: 0
},
purchaseDate: {
    type: Date,
    default: 0
},
purchasePrice: {
    type: Number,
    default: 0
},
purchaseLocation: {
    type: String,
    default: 0
},
generalNotes: {
    type: String,
    default: 0
},
picture: {
    type: String,
    default: 0
},
userId: {
    type: String
}
```

## Prints

```javascript
name: {
    type: String,
    required: true,
},
printer: {
    type: String,
    required: true
},
stlUrl: {
    type: String,
},
estPrintTime: {
    type: Number,
},
actPrintTime: {
    type: String,
},
filamentId: {
    type: String,
    required: true
},
notes: {
    type: String,
},
status: {
    type: String,
},
partId: {
    type: String,
},
settingsId: {
    type: String,
},
nozelSize: {
    type: Number,
},
filamentLength: {
    type: Number,
},
weight: {
    type: String,
},
date: {
    type: Date,
},
userId: {
    type: String
}
```

## Printers
```javascript
name: {
    type: String,
    required: true
},
make: {
    type: String,
    required: true
},
model: {
    type: String,
    required: true
},
bedWidth: {
    type: String,
},
bedLength: {
    type: String,
},
buildHeight: {
    type: String,
},
notes: {
    type: String,
},
currentFilamentId: {
    type: String,
},
status: {
    type: String,
},
picture: {
    type: String,
},
currentPrint: {
    type: String,
},
lastPrint: {
    type: String,
},
```

## Project Planner

TBD

## Community

TBD