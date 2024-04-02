from flask import Flask, request, jsonify
import torch
import torchvision.models as models
import torchvision.transforms as transforms
from PIL import Image
import io

app = Flask(__name__)

num_classes = 6
# Example mapping, adjust based on your actual classes
idx_to_class = {0: "Belts", 1:"Dress", 2: "Jackets", 3: "Socks", 4:"Trousers", 5:"T-Shirt"}


model = models.mobilenet_v3_large(pretrained=False) 
model.classifier[3] = torch.nn.Linear(model.classifier[3].in_features, num_classes)

model.load_state_dict(torch.load('./trained_model.pth'))
model.eval()

transform = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file:
        img_bytes = file.read()
        img = Image.open(io.BytesIO(img_bytes))

        img_transformed = transform(img)
        img_transformed = img_transformed.unsqueeze(0) 
        
        with torch.no_grad():
            output = model(img_transformed)
            _, predicted = torch.max(output, 1)
            predicted_index = predicted.item()
            predicted_class_name = idx_to_class[predicted_index]  # Map index to class name
        
        return jsonify({'predicted_class': predicted_class_name})

if __name__ == '__main__':
    app.run(debug=True)
