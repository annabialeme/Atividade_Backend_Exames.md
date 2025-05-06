const { format } = require("@fast-csv/format");
const PDFDocument = require("pdfkit");

const exameModel = require("../models/examesModel");

const exportExameCSV = async (req, res) => {
    try {
        const exames =  await exameModel.getExame();

        res.setHeader("Content-Disposition", "attachment; filename=exames.csv");
        res.setHeader("Content-Type", "text-csv");

        const csvStream = format({ headers: true});
        csvStream.pipe(res);

        exames.forEach((exame) => {
            csvStream.write({
                Id: exame.id,
                Tipo: exame.tipo_exame,
            });
        });
        
        csvStream.end();
    } catch (error) {
        res.status(500).json({ message: "Erro ao gerar o CSV"});
    }
};

const exportExamePDF = async (req, res) => {
    try {
        const exames = await exameModel.getAllExames();

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "inline; filename=exames.pdf")

        const doc = new PDFDocument();
        doc.pipe(res);

    
        doc.fontSize(20).text("Relatorio dos tipos de Exames", {align: "center"});
        doc.moveDown();

       
        doc.fontSize(12).text("Id | Tipo de Exame", {underline: true});
        doc.moveDown(0.5);

        
        exames.forEach((exames) => {
            doc.text(
                `${exames.id} | ${exames.exame} `
            );
        });

        doc.end(); 
    } catch (error) {
        res.status(500).json({ message: "Erro ao gerar o pdf"}); 
    }
};

module.exports = { exportExameCSV, exportExamePDF };