#librer�as utiliadas (puede que necesiten instalar una o m�s de estas librer�as, en ese caso, utilicen install.library(caTools)
library(rpart)
library(caTools)

# install.packages("RPostgreSQL")
require("RPostgreSQL")

# create a connection
# save the password that we can "hide" it as best as we can by collapsing it
pw <- {
  "12345"
}

# loads the PostgreSQL driver
drv <- dbDriver("PostgreSQL")
# creates a connection to the postgres database
# note that "con" will be used later in each connection to the database
con <- dbConnect(drv, dbname = "cancer_classification",
                 host = "localhost", port = 5432,
                 user = "postgres", password = pw)
rm(pw) # removes the password

# check for the cartable
#dbExistsTable(con, "history")
# TRUE


# query the data from postgreSQL 
bcw <- dbGetQuery(con, "SELECT * from history")
bcw=bcw[,3:12]

colnames(bcw)<-c('Thickness', 'Uniformity.Size', 
                  'Uniformity.Shape', 'Adhesion', 'Epithelial.Size', 
                  'Nuclei', 'Chromatin', 'Nucleoli', 'Mitoses','Class')

setwd('C:\\Users\\Andres Steven\\Documents\\Ionic\\Proyects\\clasificacionCancer\\ApiRestClasificacionCancer')
#bcw <- read.csv('bcw.csv', header = F, 
#                col.names = c('Sample.number', 'Thickness', 'Uniformity.Size', 
#                              'Uniformity.Shape', 'Adhesion', 'Epithelial.Size', 
#                              'Nuclei', 'Chromatin', 'Nucleoli', 'Mitoses', 'Class'),
#                na.strings = '?')
bcw$Class <- factor(bcw$Class)
#str(bcw)
#table(bcw$Class)
set.seed(4161)
splt <- sample.split(bcw$Class, SplitRatio = 0.7)
bcw.entrenamiento <- bcw[splt,]
bcw.prueba <- bcw[!splt,]

modelo.arbol <- rpart(Class ~ ., 
                      data = 
                        bcw.entrenamiento, 
                      method =  'class')

saveRDS(modelo.arbol, "modelo.rds")
predicciones <- predict(modelo.arbol, newdata = bcw.prueba, type = 'class')
table<-table(bcw.prueba$Class, predicciones)
str(((table[1][1] +table[4][1])/nrow(bcw.prueba)*100))



