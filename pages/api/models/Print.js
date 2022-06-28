class Print {
    constructor(id, name, printer, stlUrl, estPrintTime, actPrintTime, filamentId, notes, status, partId, settingsId, nozelSize, filamentLength, weight, date, userId) {
        this.id = id;
        this.name = name;
        this.printer = printer;
        this.stlUrl = stlUrl;
        this.estPrintTime = estPrintTime;
        this.actPrintTime = actPrintTime;
        this.filamentId = filamentId;
        this.notes = notes;
        this.status = status;
        this.partId = partId;
        this.settingsId = settingsId;
        this.nozelSize = nozelSize;
        this.filamentLength = filamentLength;
        this.weight = weight;
        this.date = date;
        this.userId = userId;
    }
}

export default Print