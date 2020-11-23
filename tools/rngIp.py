import ipaddress
import sys

if __name__ == "__main__":
    f = open(sys.argv[1],"a+")
    try:
        for ip in ipaddress.IPv4Network(f"{sys.argv[2]}/{sys.argv[3]}"):
            f.write(f"{ip}\n")
        f.close()
        print('yes')
    except:
        print('no')
