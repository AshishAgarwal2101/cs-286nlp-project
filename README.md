# cs-286nlp-project
NLP Project for CS 286

## Models Used
1. Roberta
2. LSTM
3. DeBERTa
<br/>
The above models are trained and added in the google drive here: https://drive.google.com/drive/folders/1FSEQRCJJ5Kb-oih_o9CjJGHSbM0ku9ra?usp=sharing

## Files and Folders
1. nlp_api.pynb - The main API file that is used to return data to the frontend.
2. exploratory_data_analysis.pynb - This is used to analyze the dataset using graphs and diagrams.
3. roberta_train.pynb - This is used to train a pretrained Roberta model using our dataset, and save the model.
4. lstm_train.pynb - This is used to train a pretrained LSTM model using our dataset, and save the model.
5. deberta_train.pynb - This is used to train a pretrained DeBERTa model using our dataset, and save the model.
6. frontend - This folder contains the ReactJS frontend code.

## How to Run (Steps 1-4 and step 11 are optional)
1. Install NodeJS version 14.18.0
2. Open terminal in frontend directory.
3. Run the command: "npm install"
4. Run the  command: "npm run build"
5. Go to the google drive link: https://drive.google.com/drive/folders/1FSEQRCJJ5Kb-oih_o9CjJGHSbM0ku9ra?usp=sharing
6. Add a shortcut to this shared folder in your drive.
7. Open nlp_api.pynb file in google colab.
8. Mount your google drive.
9. For the shortcut folder you created in Step 6, note the path to the folder in google colab.
10. Replace "BASE_PATH" in nlp_api.pynb file with the above path.
11. Optionally (not required as it's already available): Upload all the contents from /frontend/build directory to google drive's  /nlp_capstone/frontend directory.
11. Run all the cells.
12. Open the link printed in a browser window.