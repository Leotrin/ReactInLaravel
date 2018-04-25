@extends('layouts.app')

@section('content')

    <style>
        .hideButton{
            display: none;
        }
    </style>
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Dashboard</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success">
                            {{ session('status') }}
                        </div>
                    @endif

                    You are logged in!
                </div>
            </div>
            <div class="card" style="margin-top:10px;padding:10px;">
            
                @if(isset($page) && $page=="create")
                    <div id="create"></div>
                @endif
                @if(isset($page) && $page=="edit")
                    <div id="edit" data-id="{!! $id !!}"></div>
                @endif
                <div id="users"></div>
            </div>
        </div>
    </div>
</div>
@endsection
