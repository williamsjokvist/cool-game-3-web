package routers_rpc

import (
	"context"
	"io/ioutil"

	pb "github.com/GreenSoap/cool-game-3-web/proto"
)

func (s *Server) GetNotice(ctx context.Context, in *pb.GetNoticeParams) (*pb.Notice, error) {
	noticeFile, err := ioutil.ReadFile("./db/notice.txt")
	if err != nil {
		return nil, err
	}

	return &pb.Notice{Message: string(noticeFile)}, nil
}
