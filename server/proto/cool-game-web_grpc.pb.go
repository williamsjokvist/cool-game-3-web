// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.2.0
// - protoc             v3.21.12
// source: cool-game-web.proto

package proto

import (
	context "context"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.32.0 or later.
const _ = grpc.SupportPackageIsVersion7

// CoolGame3WebClient is the client API for CoolGame3Web service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type CoolGame3WebClient interface {
	GetCharacters(ctx context.Context, in *GetCharacterParams, opts ...grpc.CallOption) (*Characters, error)
	GetNotice(ctx context.Context, in *GetNoticeParams, opts ...grpc.CallOption) (*Notice, error)
	CreateAccount(ctx context.Context, in *CreateAccountParams, opts ...grpc.CallOption) (*CreateAccountResponse, error)
}

type coolGame3WebClient struct {
	cc grpc.ClientConnInterface
}

func NewCoolGame3WebClient(cc grpc.ClientConnInterface) CoolGame3WebClient {
	return &coolGame3WebClient{cc}
}

func (c *coolGame3WebClient) GetCharacters(ctx context.Context, in *GetCharacterParams, opts ...grpc.CallOption) (*Characters, error) {
	out := new(Characters)
	err := c.cc.Invoke(ctx, "/coolgame3web.CoolGame3Web/GetCharacters", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *coolGame3WebClient) GetNotice(ctx context.Context, in *GetNoticeParams, opts ...grpc.CallOption) (*Notice, error) {
	out := new(Notice)
	err := c.cc.Invoke(ctx, "/coolgame3web.CoolGame3Web/GetNotice", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *coolGame3WebClient) CreateAccount(ctx context.Context, in *CreateAccountParams, opts ...grpc.CallOption) (*CreateAccountResponse, error) {
	out := new(CreateAccountResponse)
	err := c.cc.Invoke(ctx, "/coolgame3web.CoolGame3Web/CreateAccount", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// CoolGame3WebServer is the server API for CoolGame3Web service.
// All implementations must embed UnimplementedCoolGame3WebServer
// for forward compatibility
type CoolGame3WebServer interface {
	GetCharacters(context.Context, *GetCharacterParams) (*Characters, error)
	GetNotice(context.Context, *GetNoticeParams) (*Notice, error)
	CreateAccount(context.Context, *CreateAccountParams) (*CreateAccountResponse, error)
	mustEmbedUnimplementedCoolGame3WebServer()
}

// UnimplementedCoolGame3WebServer must be embedded to have forward compatible implementations.
type UnimplementedCoolGame3WebServer struct {
}

func (UnimplementedCoolGame3WebServer) GetCharacters(context.Context, *GetCharacterParams) (*Characters, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetCharacters not implemented")
}
func (UnimplementedCoolGame3WebServer) GetNotice(context.Context, *GetNoticeParams) (*Notice, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetNotice not implemented")
}
func (UnimplementedCoolGame3WebServer) CreateAccount(context.Context, *CreateAccountParams) (*CreateAccountResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method CreateAccount not implemented")
}
func (UnimplementedCoolGame3WebServer) mustEmbedUnimplementedCoolGame3WebServer() {}

// UnsafeCoolGame3WebServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to CoolGame3WebServer will
// result in compilation errors.
type UnsafeCoolGame3WebServer interface {
	mustEmbedUnimplementedCoolGame3WebServer()
}

func RegisterCoolGame3WebServer(s grpc.ServiceRegistrar, srv CoolGame3WebServer) {
	s.RegisterService(&CoolGame3Web_ServiceDesc, srv)
}

func _CoolGame3Web_GetCharacters_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(GetCharacterParams)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(CoolGame3WebServer).GetCharacters(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/coolgame3web.CoolGame3Web/GetCharacters",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(CoolGame3WebServer).GetCharacters(ctx, req.(*GetCharacterParams))
	}
	return interceptor(ctx, in, info, handler)
}

func _CoolGame3Web_GetNotice_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(GetNoticeParams)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(CoolGame3WebServer).GetNotice(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/coolgame3web.CoolGame3Web/GetNotice",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(CoolGame3WebServer).GetNotice(ctx, req.(*GetNoticeParams))
	}
	return interceptor(ctx, in, info, handler)
}

func _CoolGame3Web_CreateAccount_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(CreateAccountParams)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(CoolGame3WebServer).CreateAccount(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/coolgame3web.CoolGame3Web/CreateAccount",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(CoolGame3WebServer).CreateAccount(ctx, req.(*CreateAccountParams))
	}
	return interceptor(ctx, in, info, handler)
}

// CoolGame3Web_ServiceDesc is the grpc.ServiceDesc for CoolGame3Web service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var CoolGame3Web_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "coolgame3web.CoolGame3Web",
	HandlerType: (*CoolGame3WebServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "GetCharacters",
			Handler:    _CoolGame3Web_GetCharacters_Handler,
		},
		{
			MethodName: "GetNotice",
			Handler:    _CoolGame3Web_GetNotice_Handler,
		},
		{
			MethodName: "CreateAccount",
			Handler:    _CoolGame3Web_CreateAccount_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "cool-game-web.proto",
}
