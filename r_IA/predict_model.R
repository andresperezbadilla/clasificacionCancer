args <- commandArgs(TRUE)
a <- as.double(args[1])
b <- as.double(args[2])
c <- as.double(args[3])
d <- as.double(args[4])
e <- as.double(args[5])
f <- as.double(args[6])
g <- as.double(args[7])
h <- as.double(args[8])
i <- as.double(args[9])

modelo.arbol <- readRDS(path.expand("C:\\Users\\Efren\\Desktop\\coloquio\\modelo.rds"))
#data=data.frame(8,10,10,8,7,10,9,7,1)
data=data.frame(a,b,c,d,e,f,g,h,i)
colnames(data)<-c('Thickness', 'Uniformity.Size', 
                  'Uniformity.Shape', 'Adhesion', 'Epithelial.Size', 
                  'Nuclei', 'Chromatin', 'Nucleoli', 'Mitoses')
final_predictions <- predict(modelo.arbol, newdata = data ,type = 'class')
  
#
#predicciones <- predict(modelo.arbol, newdata = bcw.prueba, type = 'class')
#table<-table(bcw.prueba$Class, predicciones)
#str(((table[1][1] +table[4][1])/nrow(bcw.prueba)*100))

table<-table(final_predictions)
c(table[[1]],table[[2]])



