from transformers import VisionEncoderDecoderModel, ViTImageProcessor, AutoTokenizer
import torch
from PIL import Image
import sys
import os
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'


def load_model():
    model = VisionEncoderDecoderModel.from_pretrained("./model")
    feature_extractor = ViTImageProcessor.from_pretrained("./model")
    tokenizer = AutoTokenizer.from_pretrained("./model")
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model.to(device)
    return model, feature_extractor, tokenizer, device

def predict(image_path, model, feature_extractor, tokenizer, device):
    i_image = Image.open(image_path).convert("RGB")
    pixel_values = feature_extractor(images=[i_image], return_tensors="pt").pixel_values
    pixel_values = pixel_values.to(device)
    
    gen_kwargs = {"max_length": 16, "num_beams": 4}
    output_ids = model.generate(pixel_values, **gen_kwargs)
    preds = tokenizer.batch_decode(output_ids, skip_special_tokens=True)
    return preds[0].strip()

if __name__ == "__main__":
    image_path = sys.argv[1]
    model, feature_extractor, tokenizer, device = load_model()
    caption = predict(image_path, model, feature_extractor, tokenizer, device)
    print(caption)
