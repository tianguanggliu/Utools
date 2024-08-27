from .utools import UTools

WEB_DIRECTORY = "./web"

NODE_CLASS_MAPPINGS = {
    "UTools": UTools
}

#  A dictionary that contains the friendly/humanly readable titles for the nodes
NODE_DISPLAY_NAME_MAPPINGS = {
    "UTools": "Load Image"
}

__all__ = ['NODE_CLASS_MAPPINGS', 'NODE_DISPLAY_NAME_MAPPINGS', 'WEB_DIRECTORY']
