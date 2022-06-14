class Filament {
    constructor(id, brand, type, color, diameter, weight, printingNozelTemp, printingBedTemp, maxOverHangDistance, maxOverHangAngle, purchaseDate, purchasePrice, purchaseLocation, generalNotes) {
        this.id = id,
            this.brand = brand;
        this.type = type;
        this.color = color;
        this.diameter = diameter;
        this.weight = weight;
        this.printingNozelTemp = printingNozelTemp;
        this.printingBedTemp = printingBedTemp;
        this.maxOverHangDistance = maxOverHangDistance;
        this.maxOverHangAngle = maxOverHangAngle;
        this.purchaseDate = purchaseDate;
        this.purchasePrice = purchasePrice;
        this.purchaseLocation = purchaseLocation;
        this.generalNotes = generalNotes;
    }
}

export default Filament