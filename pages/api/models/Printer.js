class Printer {
  constructor(
    id,
    name,
    make,
    model,
    bedWidth,
    bedLength,
    buildHeight,
    description,
    status,
    notes,
    userId
    /* image */
  ) {
    this.id = id;
    this.name = name;
    this.make = make;
    this.model = model;
    this.bedWidth = bedWidth;
    this.bedLength = bedLength;
    this.buildHeight = buildHeight;
    this.description = description;
    this.currentFilament = currentFilament;
    this.status = status;
    this.notes = notes;
    this.userId = userId;
    // this.image = image;
  }
}

export default Printer;
