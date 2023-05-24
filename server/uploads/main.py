import pandas as pd
import tkinter as tk
from tkinter import filedialog, messagebox
from sklearn.impute import SimpleImputer

# dialogue box
root = tk.Tk()
root.geometry("500x500")
root.configure(background='white')

# declare global variables for the buttons
Preprocess_btn = None
Linear_btn = None
SVM_btn = None
KNN_btn = None
data = None
browse_button = None



# function to be called when a file is selected
def file_selected(file_path):
    global Preprocess_btn, Linear_btn, SVM_btn, KNN_btn, data

    data = pd.read_csv(file_path, delimiter=';')
    print(data)

    # create three buttons
    Preprocess_btn = tk.Button(root, text="Preprocess Data", command=preprocess_data)
    Linear_btn = tk.Button(root, text="Linear Regression")#,command=Linear_Regression)
    SVM_btn = tk.Button(root, text="SVM Classification")#,command=SVM_Classification)
    KNN_btn = tk.Button(root, text="KNN Classification")#, compound=KNN_Classification)

    # place the buttons on the window
    Preprocess_btn.place(x=190, y=200)
    SVM_btn.place(x=190, y=230)
    Linear_btn.place(x=190, y=260)
    KNN_btn.place(x=190, y=290)

    # hide the browse button
    browse_button.place_forget()


def preprocess_data():
    global Preprocess_btn, Linear_btn, SVM_btn, KNN_btn

    Impute_btn1 = tk.Button(root, text="Impute missing values", command=Impute)
    Encode_btn = tk.Button(root, text="Encode categorical variables")
    Standardize_btn = tk.Button(root, text="Standardize the data")

    Impute_btn1.place(x=190, y=200)
    Encode_btn.place(x=190, y=230)
    Standardize_btn.place(x=190, y=260)

    # hide other buttons
    Preprocess_btn.place_forget()
    Linear_btn.place_forget()
    SVM_btn.place_forget()
    KNN_btn.place_forget()

def Impute():
    global data
    if data is None:
        messagebox.showerror("Error", "No dataset selected.")
        return

    print("hello")
    # impute missing values
    imputer = SimpleImputer(missing_values=0, strategy='mean')
    messagebox.showinfo("Imputed Dataset", data.to_string())


def browse_file():
    global browse_button

    file_path = filedialog.askopenfilename()
    if file_path:
        file_selected(file_path)



# Create a button widget for browsing files
browse_button = tk.Button(root, text="Browse", command=browse_file)
browse_button.place(x=200, y=200)

# run the dialogue
root.mainloop()
