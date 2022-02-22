# -*- coding: utf-8 -*-
from bs4 import BeautifulSoup  # Bibliothèque de scraping
import urllib.request  # Bibliothèque pour acceder a un site web
import codecs  # Bibliothèque pour lire un fichier et surtout l'encoder en UTF-8
import re  # Bibliothèque pour les expressions régulières
import json


def find_first_chevron(text):
    for i in range(len(text)):
        if text[i] == '>':
            return i
    return 0


def find_second_chevron(text):
    n = 0
    for i in range(len(text)):
        if text[i] == '<':
            if n == 1:
                return i
            n += 1
    return 0


def purge(text):
    return text.strip().replace(
        '&amp;', '&').replace("-", "_").replace('\n', '').replace(" ", "_").replace("Ã©", "é").replace("Ã¢", "â").replace("Ã¨", "è").replace("ã´", "ô").replace("Ã´", "ô").replace("Ã©", "é").replace("___", "_").replace("__", "_").lower()


def scrap(annee, filiere):
    urlpage = "https://www.scei-concours.fr/stat"+annee+"/"+filiere+".html"

    page = urllib.request.urlopen(urlpage)

    soup = BeautifulSoup(page, 'html.parser', exclude_encodings=["utf-8"])

    table = soup.find(
        'table', attrs={'class': 'table table-striped table-bordered table-hover'})

    results = table.find_all('tr')

    dict = {}
    current_concour = ''
    for i in results:
        tab = []

        if (i.find('h3') != None):
            dict[i.text] = []
            current_concour = i.text
            p = 0

        elif (i.find('td') != None):
            n = 0

            for j in i.find_all('td'):
                if n == 0:
                    if j.find('b') != None:
                        tab.append(str(j.find('b').text).replace('\xa0', ''))
                    else:
                        tab.append(" ".join(re.split(
                            r"\s+", purge(str(j)[find_first_chevron(str(j))+1:find_second_chevron(str(j))]))))
                else:
                    tab.append(j.text.replace("%", "").replace(
                        ",", ".").replace("*", ""))
                n = 1
            if p > 0:
                dict[current_concour].append(tab)
            p = 1

    # max_fill = [0 for i in range(len(dict['CONCOURS ECOLE POLYTECHNIQUE'][0]))]

    # with open(annee+"_"+filiere+".json", 'w') as outfile:
    #     json.dump(dict, outfile)

    # for key, value in dict.items():
    #     for i in value:
    #         for j in range(len(i)):
    #             if len(i[j]) > max_fill[j]:
    #                 max_fill[j] = len(i[j])

    tableau = ["concours\t", "ecole\t", "inscrits_nb\t", "inscrits_filles\t", "inscrits_cinq_demi\t", "admissibles_nb\t", "admissibles_filles\t", "admissibles_cinq_demi\t", "classes_nb\t",
               "classes_filles\t", "classes_cinq_demi\t", "integres_nb\t", "integres_filles\t", "integres_cinq_demi\t", "integres_rg_median\t", "integres_rg_moyen\t", "places\n"]

    # ? On ecrit tout les données dans le fichier
    with codecs.open(annee+"/"+annee+"_"+filiere+".tsv", 'w', encoding='utf-8') as f:
        m = ""
        for i in range(len(tableau)):
            m += tableau[i]
        f.write(m)
        for key, value in dict.items():
            key = purge(key)
            for i in value:
                m = key+"\t"
                for j in range(len(i)):
                    if(j == len(i)-1):
                        m += str(i[j])+"\n"
                    else:
                        m += str(i[j])+"\t"

                f.write(m)


annees = ["2018", "2019", "2020", "2021"]
filieres = ["mp", "pc", "psi", "pt"]
for annee in annees:
    for filiere in filieres:
        scrap(annee, filiere)

# 'BANQUE CENTRALE-SUPELEC'
# 'CONCOURS ECOLE POLYTECHNIQUE'
# 'CONCOURS COMMUN MINES-PONTS'
